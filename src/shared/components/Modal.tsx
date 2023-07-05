import styled from "@emotion/styled";

interface ModalProps {
    children?: JSX.Element;
    title?: string;
    isModalOpen: boolean;
    onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose, title, children }) => {
    return isModalOpen ? (
        <ModalOverlay onClick={onClose}>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                <Inner>
                    <Content>
                        <ModalTitle>
                            <h3>{title}</h3>
                            <span className="close-icon" onClick={onClose}>
                                &#x2715;
                            </span>
                        </ModalTitle>
                        {children}
                    </Content>
                </Inner>
            </Wrapper>
        </ModalOverlay>
    ) : null;
};

const ModalOverlay = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
    display: block;
    position: relative;
    z-index: 1;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 100px;
    width: clamp(0px, calc(100% - 48px), 768px);
    text-align: center;
`;

const Inner = styled.div`
    color: ${({ theme }) => theme.colors.textBlack};
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: saturate(180%) blur(20px);
    border: solid 1px grey;
    border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.paddings.default};
    padding: ${({ theme }) => theme.paddings.default};
`;

const ModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    .close-icon {
        cursor: pointer;
    }

    h3 {
        margin: 0;
        font-size: ${({ theme }) => theme.fontSize.fontSizeLG};
    }
`;
