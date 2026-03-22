import { http, HttpResponse } from 'msw'
import { teamMembers } from '../data/team'
import { products } from '../data/products'

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json(products)
  }),
  http.get('/api/team', () => {
    return HttpResponse.json(teamMembers)
  }),
  http.get('/api/team/:slug', ({ params }) => {
    const member = teamMembers.find((item) => item.slug === params.slug)

    if (!member) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(member)
  })
]
