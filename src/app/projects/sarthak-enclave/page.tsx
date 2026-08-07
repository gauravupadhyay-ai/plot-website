import { redirect } from 'next/navigation'

/** Sarthak Enclave is not an Aurixxrealty project — send visitors to live NCR projects. */
export default function SarthakEnclaveRemovedPage() {
  redirect('/projects')
}
