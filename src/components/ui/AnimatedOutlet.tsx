import { useLocation, useOutlet } from 'react-router-dom';

// Page-level transition via a pure CSS animation. Keying the wrapper by pathname
// remounts it on navigation, replaying the `page-enter` keyframe. CSS animations
// run on the compositor and always complete, so — unlike a JS/AnimatePresence
// exit — the page can never get trapped at partial opacity.
export default function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();

  return (
    <div key={location.pathname} className="page-enter">
      {element}
    </div>
  );
}
