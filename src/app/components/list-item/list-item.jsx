import React from 'react';

import classNames from 'classnames/bind';
import styles from './list-item.scss';

const cn = classNames.bind(styles);

const classesMedia = 'classesMedia';
const classesInner = 'list-item__inner';
const classesContent = 'classesContent';
const classesAfter = 'classesAfter';

export function ListItem({
    component: Component = 'div',
    size = 'medium',
    link = false,
    disabled = false,

    hovered,

    media,
    content,
    after,

    contentStyle,
    afterStyle,

    className,

    children,
    ...props
}) {
    const itemClasses = cn('list-item', className);

    return (
        <Component {...props} className={itemClasses}>
            {!children && renderMedia({ media })}
            {!children && renderInner({ content, after, contentStyle, afterStyle })}
            {children}
        </Component>
    )
}

function renderMedia({media}) {
    return media && <div className={classesMedia}>{media}</div>;
}

function renderInner({content, after, contentStyle, afterStyle}) {
    return (
        <div className={classesInner}>
            {content && <div className={classesContent} style={contentStyle}>{content}</div>}
            {after && <div className={classesAfter} style={afterStyle}>{after}</div>}
        </div>
    );
}
