import { Mail } from "@/app/mail/components/mail";
import { createClientMail } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function MailPage() {
	const layout = cookies().get("react-resizable-panels:layout:mail");
	const collapsed = cookies().get("react-resizable-panels:collapsed");

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

	// mails 데이터 가져오기
	const cookieStore = cookies();
	const supabase = createClientMail(cookieStore);
	const { data: mailsData } = await supabase.from('mails').select('*');
	
	return (
		<>
			<div className="flex-col sm:border-t">
				<Mail mails={mailsData} defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} navCollapsedSize={4} />
			</div>
		</>
	);
}
