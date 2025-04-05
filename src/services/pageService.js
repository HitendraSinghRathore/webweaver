export default {
  savePage (page) {
    localStorage.setItem('project_' + page.id, JSON.stringify(page))
  },
  getPage (projectId) {
    const stored = localStorage.getItem('project_' + projectId)
    return stored ? JSON.parse(stored) : null
  }
}
