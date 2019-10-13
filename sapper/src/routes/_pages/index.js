import about from './about.json'
import projects from './projects.json'
import resume from './resume.json'

export const pages = [
  about,
  resume,
  projects
]

export const lookup = new Set(pages.map(({ slug }) => slug))
