import { ModeToggle } from '@/components/mode-toggle';

export function NavigationBar() {
	return (
		<div className='flex justify-between'>
			<div>Navegação</div>
			<ModeToggle />
		</div>
	);
}