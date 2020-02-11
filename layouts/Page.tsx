import { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from 'styles/media';

import Header from 'layouts/Header';

type Props = {
    children?: React.ReactElement;
    isFullScreen?: boolean;
};

const Page = ({ children, isFullScreen }: Props) => {
    const [showChild, setShowChild] = useState(false);

    // Wait until after client-side hydration to show
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        // You can show some kind of placeholder UI here
        return null;
    }

    return (
        <PageContainer isFullScreen={isFullScreen}>
            <InnerContainer id="inner-container" isFullScreen={isFullScreen}>
                <Header />
                {children}
                <CopyRights>© Arthur Molinos {new Date().getUTCFullYear()}</CopyRights>
            </InnerContainer>
        </PageContainer>
    );
};

export default Page;

/*
 * Styled declarations
 */
interface StyledProps {
    // This prop allows us to put a fixed height on desktop
    isFullScreen?: boolean;
}

const PageContainer = styled.div<StyledProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.bg.pageGradient};

    ${media.laptop} {
        ${({ isFullScreen }) => isFullScreen && 'height: 100vh'};
        padding: 2rem;
    }
`;

const InnerContainer = styled.div<StyledProps>`
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.colors.bg.prim};
    box-shadow: 0px 2px 32px rgba(0, 0, 0, 0.25);
    ${({ isFullScreen }) => isFullScreen && 'overflow: hidden'};
    z-index: 1;

    ${media.laptop} {
        padding: 4rem;
    }

    ${media.laptopL} {
        padding: 6rem 8rem;
    }

    ${media.desktop} {
        padding: 10rem 12rem;
    }
`;

const CopyRights = styled.p`
    position: absolute;
    bottom: 0.5rem;
    left: calc(50% - 4.2rem);
    font-size: ${({ theme }) => theme.fontSizes[0]};
    color: ${({ theme }) => theme.colors.text.quar};
`;
