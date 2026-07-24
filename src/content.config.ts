import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Icon whitelist — union of all `select` option sets in public/admin/config.yml.
// Kept in sync with Icon.astro's SVG map. Adding an icon means editing all three:
// this enum, Icon.astro, and config.yml.
const socialIcon = z.enum(['instagram', 'tiktok', 'linkedin', 'whatsapp', 'mail']);
const serviceIcon = z.enum(['video', 'smartphone', 'ticket', 'handshake', 'lightbulb']);
const connectIcon = z.enum(['instagram', 'tiktok', 'folder', 'whatsapp', 'mail', 'linkedin']);

// Sveltia writes each singleton as a flat JSON object. The `file()` loader would
// otherwise treat every top-level key as its own entry, so we wrap the parsed
// object into a single `data` entry. Fetch each singleton with getEntry(coll, 'data').
const singleton = (path: string) =>
  file(path, { parser: (text: string) => ({ data: JSON.parse(text) }) });

const profile = defineCollection({
  loader: singleton('src/content/profile.json'),
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    monogram: z.string(),
    keywords: z.string(),
    bio: z.string(),
    scrollHint: z.string(),
    photo: z.string(),
    photoAlt: z.string(),
  }),
});

const social = defineCollection({
  loader: singleton('src/content/social.json'),
  schema: z.object({
    items: z.array(
      z.object({
        icon: socialIcon,
        label: z.string(),
        url: z.string(),
      }),
    ),
  }),
});

const services = defineCollection({
  loader: singleton('src/content/services.json'),
  schema: z.object({
    sectionLabel: z.string(),
    items: z.array(
      z.object({
        icon: serviceIcon,
        title: z.string(),
        description: z.string(),
        url: z.string(),
      }),
    ),
  }),
});

const about = defineCollection({
  loader: singleton('src/content/about.json'),
  schema: z.object({
    heading: z.string(),
    photo: z.string(),
    photoAlt: z.string(),
    bullets: z.array(z.string()),
    sideNote: z.string(),
  }),
});

const connect = defineCollection({
  loader: singleton('src/content/connect.json'),
  schema: z.object({
    sectionLabel: z.string(),
    items: z.array(
      z.object({
        icon: connectIcon,
        label: z.string(),
        url: z.string(),
      }),
    ),
  }),
});

const materials = defineCollection({
  loader: singleton('src/content/materials.json'),
  schema: z.object({
    sectionLabel: z.string(),
    items: z.array(
      z.object({
        image: z.string(),
        imageAlt: z.string(),
        title: z.string(),
        subtitle: z.string(),
        file: z.string(),
      }),
    ),
  }),
});

const cta = defineCollection({
  loader: singleton('src/content/cta.json'),
  schema: z.object({
    text: z.string(),
    buttonLabel: z.string(),
    buttonUrl: z.string(),
  }),
});

export const collections = { profile, social, services, about, connect, materials, cta };
