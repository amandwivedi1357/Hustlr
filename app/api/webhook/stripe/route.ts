import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import { JobPostStatus } from "@prisma/client";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const customerId = session.customer as string;
    const jobId = session.metadata?.jobId;

    console.log("Webhook received for job ID:", jobId);
    console.log("Available job status values:", Object.values(JobPostStatus));

    if (!jobId) {
      console.error("No job ID found in session metadata");
      return new Response("No job ID found", { status: 400 });
    }

    try {
      const company = await prisma.user.findUnique({
        where: {
          stripeCustomerId: customerId,
        },
        select:{
          Company:{
            select:{
              id:true
            }
          }
        }
      });

      if (!company) {
        console.error("Company not found for customer ID:", customerId);
        throw new Error("User not found...");
      }

      // Update the job post status to ACTIVE
      const updatedJob = await prisma.jobPost.update({
        where: {
          id: jobId,
          companyId: company?.Company?.id as string
        },
        data: {
          status: JobPostStatus.ACTIVE, // Use the enum directly
        },
        select: {
          id: true,
          status: true,
          companyId: true
        }
      });

      console.log("Job updated successfully:", updatedJob);
    } catch (error) {
      console.error("Error updating job status:", error);
      return new Response("Update failed", { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}
