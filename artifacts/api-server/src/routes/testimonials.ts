import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, testimonialsTable } from "@workspace/db";
import {
  SubmitTestimonialBody,
  ApproveTestimonialParams,
  ListTestimonialsResponse,
  ListTestimonialsResponseItem,
  ApproveTestimonialResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (req, res): Promise<void> => {
  const testimonials = await db
    .select()
    .from(testimonialsTable)
    .where(eq(testimonialsTable.status, "approved"))
    .orderBy(testimonialsTable.createdAt);
  res.json(ListTestimonialsResponse.parse(testimonials));
});

router.post("/testimonials", async (req, res): Promise<void> => {
  const parsed = SubmitTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid testimonial body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [testimonial] = await db
    .insert(testimonialsTable)
    .values({ ...parsed.data, status: "pending" })
    .returning();

  req.log.info({ id: testimonial.id, name: testimonial.name }, "New testimonial submitted");
  res.status(201).json(ListTestimonialsResponseItem.parse(testimonial));
});

router.patch("/testimonials/:id/approve", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = ApproveTestimonialParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [testimonial] = await db
    .update(testimonialsTable)
    .set({ status: "approved" })
    .where(eq(testimonialsTable.id, params.data.id))
    .returning();

  if (!testimonial) {
    res.status(404).json({ error: "Testimonial not found" });
    return;
  }

  req.log.info({ id: testimonial.id }, "Testimonial approved");
  res.json(ApproveTestimonialResponse.parse(testimonial));
});

export default router;
