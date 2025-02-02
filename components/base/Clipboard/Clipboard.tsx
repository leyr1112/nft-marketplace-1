import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import {
  AVATAR_VARIANT_TYPE,
  AVATAR_VARIANT_BANNER,
} from 'components/base/Avatar';
import Icon from 'components/ui/Icon';
import { breakpointMap } from 'style/theme/base';
import { clipboardCopy } from 'utils/functions';
import { middleEllipsis } from 'utils/strings';

interface Props {
  address: string;
  className?: string;
  isCopyLabelIndicator?: boolean;
  isEllipsis?: boolean;
  variant?: AVATAR_VARIANT_TYPE;
}

const Clipboard = ({
  address,
  className,
  isCopyLabelIndicator = true,
  isEllipsis = false,
  variant,
}: Props) => {
  const [isCopyIndicator, setIsCopyIndicator] = useState(false);

  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpointMap.md - 1}px)`,
  });

  useEffect(() => {
    if (isCopyIndicator) {
      const timer = setTimeout(() => {
        setIsCopyIndicator(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isCopyIndicator]);

  return (
    <SAddressWrapper
      className={className}
      onClick={() => {
        clipboardCopy(address);
        setIsCopyIndicator(true);
      }}
    >
      {isEllipsis ? middleEllipsis(address, isMobile ? 12 : 20) : address}
      {isCopyIndicator ? (
        <SSuccessContainer variant={variant}>
          <SCheckIcon name="checkMark" />
          {isCopyLabelIndicator && <SLabel>Copied !</SLabel>}
        </SSuccessContainer>
      ) : (
        <SCopyIcon name="copyPaste" variant={variant} />
      )}
    </SAddressWrapper>
  );
};

const SAddressWrapper = styled.span`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral200};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 1.2rem;

  ${({ theme }) => theme.mediaQueries.lg} {
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SSuccessContainer = styled.div<{ variant?: AVATAR_VARIANT_TYPE }>`
  ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER &&
    `position: absolute;
    left: 100%;
    display: flex;
    
    > svg {
      width: 1.6rem;
      height: 1.6rem;
    }
    `}
`;

const SCheckIcon = styled(Icon)`
  width: 1.2rem;
  fill: ${({ theme }) => theme.colors.primary};
  margin-left: 0.8rem;
`;

const SLabel = styled.span`
  margin-left: 0.4rem;
  flex: 1 0 auto;
`;

const SCopyIcon = styled(Icon)<{ variant?: AVATAR_VARIANT_TYPE }>`
  width: 1.2rem;
  fill: ${({ theme }) => theme.colors.neutral400};
  margin-left: 0.8rem;

  ${({ variant }) =>
    variant === AVATAR_VARIANT_BANNER &&
    `position: absolute;
    left: 100%;
    display: flex;
    
    > svg {
      width: 1.6rem;
      height: 1.6rem;
    }
    `}
`;

export default Clipboard;
