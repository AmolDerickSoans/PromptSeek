export const post = {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The title of the blog post.',
        validation: (Rule: { required: () => any }) => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        description: 'A unique identifier for the post, derived from the title.',
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{type: 'author'}],
        description: 'Reference to the author of the post, linking to the author document.',
        validation: (Rule: { required: () => any }) => Rule.required()
      },
      {
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
          hotspot: true
        },
        description: 'The main image representing the post. Must be in WebP format.',
        validation: (Rule: { custom: (arg0: (image: any) => any) => any }) => 
          Rule.custom((image) => {
            if (image && image.asset && image.asset.url) {
              return image.asset.url.endsWith('.webp') || 'Image must be in WebP format.';
            }
            return true; // Allow if no image is provided
          })
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{type: 'reference', to: {type: 'tag'}}],
        description: 'Tags associated with the post, linking to tag documents.',
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime',
        description: 'The date and time when the post was published.',
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        validation: (Rule: { max: (arg0: number) => any }) => Rule.max(200),
        description: 'A brief summary of the post content.',
      },
      {
        name: 'body',
        title: 'Body',
        type: 'array',
        of: [
          {type: 'block'},
          {
            type: 'image',
            options: {hotspot: true}
          },
          {
            type: 'object',
            name: 'codeBlock',
            fields: [
              {name: 'code', title: 'Code', type: 'text', description: 'Code snippet included in the post.'},
              {name: 'filename', title: 'Filename', type: 'string', description: 'Name of the file related to the code snippet.'}
            ],
            description: 'A block for including code snippets with filenames.'
          }
        ],
        description: 'The main content of the post, which can include text, images, and code blocks.',
      },
      {
        name: 'wordLinks',
        title: 'Word Links',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {
              name: 'word',
              title: 'Word',
              type: 'string',
              description: 'The word to be linked in the post.'
            },
            {
              name: 'link',
              title: 'Word Link Reference',
              type: 'reference',
              to: [{type: 'wordLink'}],
              description: 'Reference to the link associated with the word.'
            }
          ]
        }],
        description: 'Links to words in the post that reference other documents.',
      },
      {
        name: 'readingTime',
        title: 'Reading Time (minutes)',
        type: 'number',
        description: 'Estimated time to read the post, in minutes.',
      },
      {
        name: 'featured',
        title: 'Featured Post',
        type: 'boolean',
        description: 'Indicates if the post should be featured in the hero carousel.',
      },
      {
        name: 'views',
        title: 'View Count',
        type: 'number',
        initialValue: 0,
        description: 'The number of times the post has been viewed.',
      },
      {
        name: 'sponsored',
        title: 'Sponsored Post',
        type: 'boolean',
        description: 'Indicates if the post is sponsored content.',
      },
      {
        name: 'video',
        title: 'Mux Video',
        type: 'mux.video',
        description: 'Video content related to the post, hosted on Mux.',
      },
      {
        name: 'nextPost',
        title: 'Next Post',
        type: 'reference',
        to: [{type: 'post'}],
        description: 'Reference to the next suggested post for navigation.',
      },
      {
        name: 'section',
        title: 'Section/Category',
        type: 'reference',
        to: [{type: 'category'}],
        description: 'Reference to the category the post belongs to.',
      },
      {
        name: 'huggingFaceEmbed',
        title: 'Hugging Face Embed',
        type: 'object',
        fields: [
          {
            name: 'url',
            title: 'Embed URL',
            type: 'url',
            description: 'URL for the Hugging Face embed.'
          },
          {
            name: 'title',
            title: 'Embed Title',
            type: 'string',
            description: 'Title for the Hugging Face embed.'
          },
          {
            name: 'description',
            title: 'Embed Description',
            type: 'text',
            description: 'Description for the Hugging Face embed.'
          }
        ],
        description: 'Embed information for Hugging Face content in the post.',
      },
      {
        name: 'relatedPosts',
        title: 'Related Posts',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'post'}]}],
        description: 'Manually selected related posts for additional reading.',
      },
      {
        name: 'sponsoredPriority',
        title: 'Sponsored Priority',
        type: 'number',
        description: 'Lower number means higher priority for sponsored content display.',
      }
    ],
    orderings: [
      {
        title: 'Publishing Date, New',
        name: 'publishingDateDesc',
        by: [
          {field: 'publishedAt', direction: 'desc'},
          {field: 'title', direction: 'asc'}
        ]
      },
      {
        title: 'Publishing Date, Old',
        name: 'publishingDateAsc',
        by: [
          {field: 'publishedAt', direction: 'asc'},
          {field: 'title', direction: 'asc'}
        ]
      }
    ],
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        media: 'mainImage'
      },
      prepare(selection: { author: any }) {
        const {author} = selection
        return {...selection, subtitle: author && `by ${author}`}
      }
    }
  }