// SideBar.tsx
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Burger, useMatches } from '@mantine/core';
import { navLinks } from './Header';

const SideBar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const size = useMatches({
    xs: 'md',
    sm: 'lg',
    md: 'lg',
    lg: 'xl',
  });

  return (
    <>
      {/* Sidebar */}
      <Drawer.Root
        className='!-z-0'
        position='right'
        size={'30vw'}
        opened={opened}
        onClose={toggle}
      >
        <Drawer.Overlay className='!-z-0 !backdrop-opacity-85 blur-sm' />
        <Drawer.Content className='!-z-0' bg='#6A3502'>
          <Drawer.Body className='relative mt-20 xs:mt-24 flex flex-col gap-5' bg='#6A3502'>
            {navLinks(true, toggle)}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      {/* Header ka Burger Icon */}
      <Burger
        className='!z-50 !relative'
        color='#877337'
        lineSize={4}
        size={size}
        opened={opened}
        onClick={toggle}
      />
    </>
  );
}

export default SideBar;
