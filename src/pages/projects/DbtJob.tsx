import ProjectPageLayout from './ProjectPageLayout'
import PasswordGate from '../../components/PasswordGate'
import content from '../../content/projects/dbt-job.md?raw'

export default function DbtJob() {
  return (
    <PasswordGate projectTitle="dbt Job" projectCategory="Shipped Product">
      <ProjectPageLayout content={content} />
    </PasswordGate>
  )
}
