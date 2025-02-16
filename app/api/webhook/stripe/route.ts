import { NextResponse } from 'next/server';
import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("Stripe-Signature");

    if (!signature) {
      console.error('Missing Stripe-Signature header');
      return new NextResponse('Missing Stripe-Signature', { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      console.error('Webhook signature verification error:', err);
      return new NextResponse('Webhook signature verification failed', { status: 400 });
    }

    // Handle different Stripe event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string;
        const jobId = session.metadata?.jobId;

        if (!jobId) {
          console.error('No job ID found in session metadata');
          return new NextResponse('No job ID found', { status: 400 });
        }

        const company = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
          select: {
            Company: {
              select: { id: true }
            }
          }
        });

        if (!company || !company.Company) {
          console.error('Company not found for customer ID:', customerId);
          return new NextResponse('Company not found', { status: 404 });
        }

        try {
          const updatedJob = await prisma.jobPost.update({
            where: { 
              id: jobId,
              companyId: company?.Company?.id
            },
            data: { 
              status: "ACTIVE" 
            }
          });

          console.log('Job post activated:', updatedJob.id);
        } catch (updateError) {
          console.error('Failed to update job post status:', updateError);
          return new NextResponse('Failed to update job post', { status: 500 });
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new NextResponse('Webhook processing error', { status: 500 });
  }
}
