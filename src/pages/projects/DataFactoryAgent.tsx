import ProjectPageLayout from './ProjectPageLayout'
import PasswordGate from '../../components/PasswordGate'
import content from '../../content/projects/data-factory-agent.md?raw'

export default function DataFactoryAgent() {
  return (
    <PasswordGate projectTitle="Data Factory Agent" projectCategory="Shipped Product">
      <ProjectPageLayout content={content} />
    </PasswordGate>
  )
}
