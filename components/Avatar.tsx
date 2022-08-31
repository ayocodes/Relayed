import React from "react";
import styled from "styled-components";

interface IAvatarProps {
  className?: any;
  imgUrl?: string;
  height: string;
  width: string;
}

interface ISAvatarProps {
    height: string;
    width: string;
}

const SAvatar = styled.img<ISAvatarProps>`
  border-radius: 50%;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  object-fit: cover;

`;

const Avatar: React.FC<IAvatarProps> = ({
  className,
  imgUrl,
  height,
  width
}) => {
  return <SAvatar className={className} src={imgUrl} height={height} width={width} />;
};

export default Avatar;
