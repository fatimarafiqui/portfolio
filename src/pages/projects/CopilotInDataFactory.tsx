import ProjectPageLayout from './ProjectPageLayout'
import PasswordGate from '../../components/PasswordGate'
import content from '../../content/projects/copilot-in-data-factory.md?raw'

export default function CopilotInDataFactory() {
  return (
    <PasswordGate projectTitle="Copilot in Data Factory" projectCategory="Shipped Product">
      <ProjectPageLayout content={content} />
    </PasswordGate>
  )
}
