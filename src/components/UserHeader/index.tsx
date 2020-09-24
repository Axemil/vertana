import React, { ReactElement } from 'react';
import Colors from 'common/Colors';
import styled from 'styled-components';
import { UserDescription } from 'pages/Archives';
import { useImageOnLoad } from 'hooks/usePageNumber';
import Fonts from 'common/Fonts';
import { stripTags } from 'util/helpers';
import { ReactComponent as FacebookLogo } from 'assets/svg/facebook.svg';
import { ReactComponent as LinkedinLogo } from 'assets/svg/linkedin.svg';
import { ReactComponent as TwitterLogo } from 'assets/svg/twitter.svg';
import Media from 'common/Media';

const UserHeaderWrapper = styled.header`
  background-color: ${Colors.Gray100};

  min-height: 300px;
  padding: 110px 20px 70px 20px;

  @media (min-width: ${Media.tabletSm}) {
    padding-left: 35px;
    padding-right: 35px;
  }

  @media (min-width: ${Media.tabletSm}) {
    padding-left: 30px;
    padding-right: 30px;
  }

  & .user-header__container {
    @media (min-width: ${Media.tabletSm}) {
      display: flex;
    }
    @media (min-width: ${Media.laptop}) {
      width: 1200px;
      margin: 0 auto;
    }
  }

  & .user-header__avatar-container {
    flex: 0 0 auto;
    text-align: center;
    padding-right: 30px;
  }

  & .user-header__avatar {
    margin-bottom: 30px;
  }

  & .user-header__icons-on-tablet-lg {
    display: none;

    @media (min-width: ${Media.tabletLg}) {
      display: block;
    }
  }

  & .user-header__info {
  }

  & .user-header__title-section {
    display: flex;
    align-items: flex-end;
    margin-bottom: 8px;
  }

  & .user-header__icons {
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-bottom: 8px;

    @media (min-width: ${Media.tabletLg}) {
      display: none;
    }
  }

  & .user-header__social-icon {
    height: 15px;
  }
  & .user-header__icon-link:not(:last-child) {
    margin-right: 25px;
  }

  & .user-header__user-name {
    margin-right: 40px;
  }

  & .user-header__short-description {
  }

  & .user-header__detailed-description {
    @media (min-width: 500px) {
      width: 90%;
    }

    @media (min-width: ${Media.tabletSm}) {
      width: 100%;
    }
  }
`;

interface AvatarProps {
  visible?: boolean;
}
const Avatar = styled.img<AvatarProps>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: opacity 600ms;
`;

const UserName = styled.h1`
  font-family: ${Fonts.Bold} !important;
  font-size: 30px !important;
  line-height: 46px !important;
  color: ${Colors.Black} !important;
`;

const ShortDescription = styled.p`
  font-family: ${Fonts.Regular} !important;
  font-size: 14px !important;
  color: ${Colors.Gray700} !important;

  & .dot {
    font-size: 10px;
    display: inline-block;
    margin: 0 10px;
  }
`;

const DetailedDescription = styled.p`
  font-family: ${Fonts.Regular} !important;
  font-size: 16px !important;
  color: ${Colors.Black} !important;
`;

const FavouriteTopics = styled.p`
  margin-bottom: 0 !important;

  & > * {
    margin-right: 10px;
  }
  & .favourite-topics__text {
    font-family: ${Fonts.Regular} !important;
    font-size: 14px !important;
    color: ${Colors.Gray700} !important;
  }

  & .favourite-topics__topic {
    font-family: ${Fonts.Bold} !important;
    font-size: 14px !important;
    color: ${Colors.Black} !important;
    & :not(:last-child):after {
      content: ',';
    }
  }
`;

interface Props {
  data: UserDescription;
}

export default function UserHeader({
  data: {
    name,
    twitter,
    linkedin,
    facebook,
    additionalInfo: {
      city,
      shortDescription,
      detailedDescription,
      favouriteTopics,
    },
    avatar: { url },
    posts,
  },
}: Props): ReactElement {
  const visible = useImageOnLoad(url);
  console.log(posts)
  return (
    <UserHeaderWrapper>
      <div className="user-header__container">
        <div className="user-header__avatar-container">
          <Avatar visible={visible} src={url} className="user-header__avatar" />
          <div className="user-header__icons-on-tablet-lg">
            <a className="user-header__icon-link" href={facebook}>
              <FacebookLogo className="user-header__social-icon" />
            </a>
            <a className="user-header__icon-link" href={linkedin}>
              <LinkedinLogo className="user-header__social-icon" />
            </a>
            <a className="user-header__icon-link" href={twitter}>
              <TwitterLogo className="user-header__social-icon" />
            </a>
          </div>
        </div>
        <div className="user-header__info">
          <div className="user-header__title-section">
            <UserName className="user-header__user-name">{name}</UserName>
            <div className="user-header__icons">
              <a className="user-header__icon-link" href={facebook}>
                <FacebookLogo className="user-header__social-icon" />
              </a>
              <a className="user-header__icon-link" href={linkedin}>
                <LinkedinLogo className="user-header__social-icon" />
              </a>
              <a className="user-header__icon-link" href={twitter}>
                <TwitterLogo className="user-header__social-icon" />
              </a>
            </div>
          </div>
          <ShortDescription className="user-header__short-description">
            {shortDescription && stripTags(shortDescription)}
            {shortDescription && city && <span className="dot">&#x25cf;</span>}
            {city && stripTags(city)}
          </ShortDescription>
          <DetailedDescription className="user-header__detailed-description">
            {detailedDescription && stripTags(detailedDescription)}
          </DetailedDescription>
          {posts.length > 0 && (
            <FavouriteTopics>
              <span className="favourite-topics__text">Favourite topics:</span>
              {posts.map((name) => <a href="">{' ' + name + ' '}</a>)}
            </FavouriteTopics>
          )}
        </div>
      </div>
    </UserHeaderWrapper>
  );
}
