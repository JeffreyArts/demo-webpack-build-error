import { CollectionConfig } from 'payload/types'

const AdminUsers: CollectionConfig = {
  slug: 'admin-users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default AdminUsers
