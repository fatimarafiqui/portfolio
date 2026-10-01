import ProjectPageLayout from './ProjectPageLayout'
import PasswordGate from '../../components/PasswordGate'
import content from '../../content/projects/ar-anchor-cards.md?raw'

export default function ARAnchorCards() {
  return (
    <PasswordGate projectTitle="AR Anchor Cards" projectCategory="Passion Project">
      <ProjectPageLayout content={content} />
    </PasswordGate>
  )
}
