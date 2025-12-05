import { z, defineCollection } from 'astro:content';

/**
 * Content Collection Schemas
 * Type-safe content management for all MDX sections
 */

// Base schema for all sections
const sectionSchema = z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    order: z.number().default(0),
    visible: z.boolean().default(true),
    background: z.enum(['light', 'dark', 'mist', 'forest', 'transparent']).default('light'),
    images: z.array(z.object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
    })).optional(),
});

// Hero section schema
const heroCollection = defineCollection({
    type: 'content',
    schema: sectionSchema.extend({
        backgroundImage: z.string().optional(),
        ctaText: z.string().optional(),
        ctaHref: z.string().optional(),
    }),
});

// Why section schema
const whyCollection = defineCollection({
    type: 'content',
    schema: sectionSchema.extend({
        painPoints: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string().optional(),
        })).optional(),
    }),
});

// How section schema
const howCollection = defineCollection({
    type: 'content',
    schema: sectionSchema.extend({
        approaches: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string().optional(),
        })).optional(),
    }),
});

// Process section schema
const processCollection = defineCollection({
    type: 'content',
    schema: sectionSchema.extend({
        steps: z.array(z.object({
            number: z.number(),
            title: z.string(),
            description: z.string(),
        })).optional(),
    }),
});

// Pricing section schema
const pricingCollection = defineCollection({
    type: 'content',
    schema: sectionSchema.extend({
        packages: z.array(z.object({
            name: z.string(),
            price: z.string(),
            description: z.string(),
            features: z.array(z.string()),
            highlighted: z.boolean().optional(),
            ctaText: z.string().optional(),
        })).optional(),
        note: z.string().optional(),
    }),
});

// FAQ section schema
const faqCollection = defineCollection({
    type: 'content',
    schema: sectionSchema.extend({
        questions: z.array(z.object({
            question: z.string(),
            answer: z.string(),
        })).optional(),
    }),
});

// Regulations section schema
const regulationsCollection = defineCollection({
    type: 'content',
    schema: sectionSchema.extend({
        sections: z.array(z.object({
            title: z.string(),
            content: z.string(),
        })).optional(),
    }),
});

export const collections = {
    hero: heroCollection,
    why: whyCollection,
    how: howCollection,
    process: processCollection,
    pricing: pricingCollection,
    faq: faqCollection,
    regulations: regulationsCollection,
};
