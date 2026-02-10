export const useContent = () => {
  const fetchMarkdown = async (slug: string) => {
    const { data } = await useFetch(`/api/content/${slug}`)
    return data
  }

  const listContent = async () => {
    const { data } = await useFetch('/api/content')
    return data
  }

  return {
    fetchMarkdown,
    listContent,
  }
}
