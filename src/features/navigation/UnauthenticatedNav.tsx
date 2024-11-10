import { Button, Stack } from '@mantine/core';
import ThemeToggle from '../theme/ThemeToggle';
import { NavLink } from 'react-router-dom';

type Props = {}

function UnauthenticatedNav({}: Props) {
	return (
		<Stack style={{ flexGrow: 1 }}>
			<Stack gap={8}>
				<Button
					component={NavLink}
					to="/login"
					variant="outline"
					color="violet"
				>
					Login
				</Button>
				<Button
					component={NavLink}
					to="/register"
					color="violet"
				>
					Register
				</Button>
			</Stack>
			<Stack mt="auto">
				<ThemeToggle />
			</Stack>
		</Stack>
	);
}

export default UnauthenticatedNav