import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Colors from 'common/Colors';
import Fonts from 'common/Fonts';
import { loaderMixin } from 'util/mixins';
import { useLocation, useHistory } from 'react-router-dom';

interface Props {
  className?: string;
  author?: string;
  authorLink?: string;
  date?: string;
  timeToRead?: string;
  type: 'hero' | 'card';
  onClick?: (e: React.SyntheticEvent) => void;
}

const PostInfoWrapper = styled.div<Props>`
  font-family: ${Fonts.Regular};
  font-size: 14px;
  line-height: 22px;

  .by {
    color: ${(props) =>
      (props.type === 'hero' && Colors.White) || Colors.Gray700};
  }

  .dot {
    color: ${(props) =>
      (props.type === 'hero' && Colors.White) || Colors.Black};
    margin: 0 12px;
    font-size: 10px;
    opacity: 0.5;
  }

  & .vi-blog-user {
    font-family: ${Fonts.Bold};
    color: ${(props) =>
      (props.type === 'hero' && Colors.White) || Colors.Black};
    cursor: pointer;

    &:hover {
      color: ${Colors.GreenDark};
    }
  }

  .date {
    color: ${(props) =>
      (props.type === 'hero' && Colors.White) || Colors.Gray700};
  }

  .time {
    color: ${(props) =>
      (props.type === 'hero' && Colors.White) || Colors.Gray700};
  }
`;

export default function PostInfo({
  className,
  author,
  authorLink,
  date,
  timeToRead,
  type,
  onClick,
}: Props): ReactElement {
  const history = useHistory();
  const handleClick = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    history.push(authorLink);
  };
  return (
    <PostInfoWrapper onClick={onClick} type={type} className={className}>
      <span className="by">by </span>
      <a
        href={authorLink}
        onClick={handleClick}
        data-element="user"
        className="vi-blog-user"
      >
        {author}
      </a>
      <span className="dot">&#x25cf;</span>
      {date && (
        <>
          <span className="date">{date}</span>
          <span className="dot">&#x25cf;</span>
        </>
      )}
      <span className="time">{timeToRead} to read</span>
    </PostInfoWrapper>
  );
}
