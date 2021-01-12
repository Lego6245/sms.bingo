import getMatchTimeString from './helpers/getMatchTimeString';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function TimeSlug(props: { matchTime: number }) {
    return (
        <Tippy content={getMatchTimeString(props.matchTime, true /* est */)}>
            <span>{getMatchTimeString(props.matchTime)}</span>
        </Tippy>
    );
}
