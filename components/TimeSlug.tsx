import getMatchTimeString from './helpers/getMatchTimeString';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function TimeSlug(props: {
    matchTime: number;
    forceEst?: boolean;
    short?: boolean;
}) {
    return (
        <Tippy content={getMatchTimeString(props.matchTime, true /* est */, props.short)}>
            <span>{getMatchTimeString(props.matchTime, props.forceEst, props.short)}</span>
        </Tippy>
    );
}
