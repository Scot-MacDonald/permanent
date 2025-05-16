import { Block } from 'payload'

export const Articles: Block = {
  slug: 'articles', // The unique identifier for the block
  fields: [
    {
      name: 'articles', // Field name
      type: 'array', // Array of articles
      required: true, // Make it a required field
      fields: [
        {
          name: 'title', // Title of the article
          type: 'text',
          required: true,
        },
        {
          name: 'batch', // Batch information (e.g., "S/S 24")
          type: 'text',
          required: true,
        },
        {
          name: 'services', // Services related to the article
          type: 'array',
          required: true,
          fields: [
            {
              name: 'service',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'year', // Year of the article
          type: 'text',
          required: true,
        },
        {
          name: 'url', // URL for the article link
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  interfaceName: 'ArticlesBlock', // Ensures TypeScript type generation
}
