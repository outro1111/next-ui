import { Mail } from "@/app/mail/components/mail";
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function MailPage() {
	const layout = cookies().get("react-resizable-panels:layout:mail");
	const collapsed = cookies().get("react-resizable-panels:collapsed");

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

	// mails 데이터 가져오기
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data: mailsData } = await supabase.from('mails').select('*').order('date', { ascending: false });
	
	return (
		<>
			<div className="flex-col sm:border-t">
				<Mail mails={mailsData} defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} navCollapsedSize={4} />
			</div>
		</>
	);
}

export const metadata = {
  title: "Cellink | 메일",
  description: "메일",
}