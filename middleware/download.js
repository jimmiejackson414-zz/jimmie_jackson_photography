export default function ({ query, redirect }) {
  // if UID is not present, redirect to 404
  if (!query.uid) redirect('/404')
}