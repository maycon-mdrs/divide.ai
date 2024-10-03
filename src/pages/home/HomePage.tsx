import { NavigationBar } from "@/components/navigation/NavigationBar"

export function HomePage() {
	return (
		<div className="flex flex-col">
			<NavigationBar />
			<h1>Home Page</h1>
		</div>
	);
}