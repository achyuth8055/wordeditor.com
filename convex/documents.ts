import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';
import { filter } from 'convex-helpers/server/filter';

/**
 * Create new document
 * @param title - Optional document title
 * @param initialContent - Optional initial content
 * @returns Newly created document ID
 * @throws ConvexError when user is not authenticated
 */
export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // No authentication - use default user
    const defaultUserId = 'anonymous-user';
    const organizationId = undefined;

    return await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled Document',
      initialContent: args.initialContent ?? '',
      ownerId: defaultUserId,
      organizationId,
    });
  },
});

/**
 * Get document list
 * @param paginationOpts - Pagination options
 * @param search - Optional search keyword
 * @returns Paginated document list
 * @throws ConvexError when user is not authenticated
 */
export const get = query({
  args: v.object({
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  }),
  handler: async (ctx, { search, paginationOpts }) => {
    // No authentication - show all documents
    const defaultUserId = 'anonymous-user';

    // Has keyword, filter by title
    if (search) {
      return await filter(
        ctx.db.query('documents').withIndex('by_owner_id', q => {
          return q.eq('ownerId', defaultUserId);
        }),
        document => {
          return document.title.includes(search);
        },
      )
        .order('desc')
        .paginate(paginationOpts);
    }

    // Default query: show all documents for anonymous user
    return await ctx.db
      .query('documents')
      .withIndex('by_owner_id', q => {
        return q.eq('ownerId', defaultUserId);
      })
      .order('desc')
      .paginate(paginationOpts);
  },
});

/**
 * Delete specified document
 * @param id - Document ID to delete
 * @throws ConvexError when document does not exist or user has no permission
 */
export const removeById = mutation({
  args: {
    id: v.id('documents'),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('Document not found');
    }

    return await ctx.db.delete(args.id);
  },
});

/**
 * Update document title
 * @param id - Document ID to update
 * @param title - New document title
 * @throws ConvexError when document does not exist or user has no permission
 */
export const updateById = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('Document not found');
    }

    return await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

export const getById = query({
  args: {
    id: v.id('documents'),
  },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('Document not found');
    }
    return document;
  },
});

export const getByIds = query({
  args: {
    ids: v.array(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const results = await Promise.allSettled(
      args.ids.map(async id => {
        const document = await ctx.db.get(id);
        return document
          ? {
              id: document._id,
              name: document.title,
            }
            : { id, name: '[Deleted/Not Found]' };
      }),
    );

    // Process each Promise result
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      // If query fails, return error status
      return { id: args.ids[index], name: '[Query Failed]' };
    });
  },
});
