import { STATUS_LABELS, type InquiryStatus } from '@/lib/admin/inquiries';

const STYLES: Record<InquiryStatus, string> = {
  new: 'bg-[#F5E528] text-[#040000] font-bold',
  in_progress: 'bg-[#040000] text-white',
  done: 'bg-[#E3E5E8] text-[#40454C]',
  spam: 'bg-white text-[#8A8F96] border border-[#DADCDF]',
};

export default function StatusBadge({ status }: { status: InquiryStatus }) {
  return <span className={`inline-block whitespace-nowrap px-2 py-0.5 text-xs ${STYLES[status]}`}>{STATUS_LABELS[status]}</span>;
}
