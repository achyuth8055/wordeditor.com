import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    // Initial content
    initialContent: v.optional(v.string()),
    // Document owner
    ownerId: v.string(),
    // Room ID for collaboration
    roomId: v.optional(v.string()),
    /**
     * Organization ID
     * Use organizationId and roomId to enable permission-based collaboration
     * We have strict rules about who can access our rooms, only those who have lived in our rooms can access them.
     * Access to our rooms is very strict, only people within our organization can be invited, and these invitations will be sent to the user's email.
     */
    organizationId: v.optional(v.string()),
  })
    .index('by_owner_id', ['ownerId'])
    .index('by_owner_and_org', ['ownerId', 'organizationId'])
    .index('by_organization_id', ['organizationId'])
    .searchIndex('search_title', {
      // Specify the field to search
      searchField: 'title',
      /**
       * Fields for precise filtering
       * Filter fields will be creator ID and organization ID, so we won't traverse the entire database, but only look for the creator or organization ID of specific documents
       */
      filterFields: ['ownerId', 'organizationId'],
    }),
});
