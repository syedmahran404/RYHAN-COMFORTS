import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * POST /api/quote — stub endpoint that accepts a dehydrated quote.
 *
 * Phase 2:
 *   - Persist to Postgres via Prisma (`Quote`, `QuoteLine` tables)
 *   - Email the atelier + send a WhatsApp notification
 *   - Return a shareable quote id and a PDF render URL
 */

const DehydratedQuoteSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  selection: z.record(z.union([z.string(), z.number()])),
  total: z.number(),
  capturedAt: z.string()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = DehydratedQuoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid payload', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    // TODO Phase 2: persist + notify
    return NextResponse.json({
      ok: true,
      id: `Q-${Date.now().toString(36).toUpperCase()}`,
      echo: parsed.data
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
}
