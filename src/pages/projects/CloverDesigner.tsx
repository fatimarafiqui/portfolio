import ProjectPageLayout from './ProjectPageLayout'
import PasswordGate from '../../components/PasswordGate'
import content from '../../content/projects/clover-designer.md?raw'

export default function CloverDesigner() {
  return (
    <PasswordGate projectTitle="Clover Designer" projectCategory="Shipped Product">
      <ProjectPageLayout content={content} />
    </PasswordGate>
  )
}
