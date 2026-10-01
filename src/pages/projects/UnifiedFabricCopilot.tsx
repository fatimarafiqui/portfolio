import ProjectPageLayout from './ProjectPageLayout'
import PasswordGate from '../../components/PasswordGate'
import content from '../../content/projects/unified-fabric-copilot.md?raw'

export default function UnifiedFabricCopilot() {
  return (
    <PasswordGate projectTitle="Unified Fabric Copilot" projectCategory="Hackathon 2025">
      <ProjectPageLayout content={content} />
    </PasswordGate>
  )
}
