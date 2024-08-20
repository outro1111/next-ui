import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { format } from "date-fns";
import { ko } from 'date-fns/locale';

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";


export function MailList({ items, selectedMailId, setSelectedMailId }) {

	//메일 날짜 1년 미만일때 시간차이, 이상일때 날짜로 출력
	const formatDate = (date) => {
		const someDate = new Date(date);
		const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000; //1년
		const isWithinOneYear = Date.now() - someDate.getTime() < millisecondsInYear;
		
		return isWithinOneYear
		? formatDistanceToNow(someDate, { addSuffix: true, locale: ko })
		: format(someDate, 'PPP EEE p', { locale: ko });
	};

	return (
		<ScrollArea className="h-[calc(100vh-128px)]">
			<div className="flex flex-col gap-2 p-4 pt-0">
				{items.map((item) => (					
					<button
						key={item.id}
						className={cn(
							"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
							selectedMailId === item.id && "bg-muted"
						)}
						onClick={() => setSelectedMailId(item.id)}
					>
						<div className="flex w-full flex-col gap-1">
							<div className="flex items-center">
								<div className="flex items-center gap-2">
									<div className="font-semibold">{item.name}</div>
									{!item.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
								</div>
								<div className={cn("ml-auto text-xs", selectedMailId === item.id ? "text-foreground" : "text-muted-foreground")}>
									{formatDate(item.date)}
								</div>
							</div>
							<div className="text-xs font-medium">{item.subject}</div>
						</div>
						<div className="line-clamp-2 text-xs text-muted-foreground">{item.text.substring(0, 300)}</div>
						{item.labels.length ? (
							<div className="flex items-center gap-2">
								{item.labels.map((label) => (
									<Badge key={label} variant={getBadgeVariantFromLabel(label)}>
										{label}
									</Badge>
								))}
							</div>
						) : null}
					</button>
				))}
			</div>
		</ScrollArea>
	);
}

function getBadgeVariantFromLabel(label) {
	if (["work"].includes(label.toLowerCase())) {
		return "default";
	}

	if (["personal"].includes(label.toLowerCase())) {
		return "outline";
	}

	return "secondary";
}
