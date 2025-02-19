import React from "react";
import { LayoutWrapper } from "@components/layoutWrapper";
import { IRefineContextProvider } from "../../contexts/refine/IRefineContext";
import { render, TestWrapper, MockJSONServer } from "@test";
import { Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { LayoutProps } from "src/interfaces";

const renderWithRefineContext = (
    children: React.ReactNode,
    refineProvider: IRefineContextProvider,
) => {
    return render(<Route path="/">{children}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/"],
            refineProvider,
        }),
    });
};

describe("LayoutWrapper", () => {
    it("LayoutWrapper successfully pass the custom components to Layout component as a props", () => {
        const customSiderContent = "customSiderContent";
        const CustomSider = () => <p>{customSiderContent}</p>;

        const customHeaderContent = "customHeaderContent";
        const CustomHeader = () => <p>{customHeaderContent}</p>;

        const customFooterContent = "customFooterContent";
        const CustomFooter = () => <p>{customFooterContent}</p>;

        const customOffLayoutAreaContent = "customOffLayoutAreaContent";
        const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

        const customTitleContent = "customTitleContent";
        const CustomTitle = () => <p>{customTitleContent}</p>;

        const CustomLayout: React.FC<LayoutProps> = ({
            Header,
            Sider,
            Footer,
            OffLayoutArea,
            Title,
            children,
        }) => {
            return (
                <div>
                    {Header && <Header />}
                    {Title && <Title collapsed={true} />}
                    {Sider && <Sider />}
                    {children}
                    {Footer && <Footer />}
                    {OffLayoutArea && <OffLayoutArea />}
                </div>
            );
        };

        const { getByText } = renderWithRefineContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            hasDashboard: false,
            Layout: CustomLayout,
            Sider: CustomSider,
            Header: CustomHeader,
            Footer: CustomFooter,
            OffLayoutArea: CustomOffLayoutArea,
            Title: CustomTitle,
        });

        getByText(customSiderContent);
        getByText(customHeaderContent);
        getByText(customFooterContent);
        getByText(customOffLayoutAreaContent);
        getByText(customTitleContent);
    });

    it("By default, LayoutWrapper not renders the custom components", () => {
        const customSiderContent = "customSiderContent";
        const CustomSider = () => <p>{customSiderContent}</p>;

        const customHeaderContent = "customHeaderContent";
        const CustomHeader = () => <p>{customHeaderContent}</p>;

        const customFooterContent = "customFooterContent";
        const CustomFooter = () => <p>{customFooterContent}</p>;

        const customOffLayoutAreaContent = "customOffLayoutAreaContent";
        const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

        const customTitleContent = "customTitleContent";
        const CustomTitle = () => <p>{customTitleContent}</p>;

        const { queryByText } = renderWithRefineContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            hasDashboard: false,
            Sider: CustomSider,
            Header: CustomHeader,
            Footer: CustomFooter,
            OffLayoutArea: CustomOffLayoutArea,
            Title: CustomTitle,
        });

        expect(queryByText(customSiderContent)).toBeNull();
        expect(queryByText(customHeaderContent)).toBeNull();
        expect(queryByText(customFooterContent)).toBeNull();
        expect(queryByText(customOffLayoutAreaContent)).toBeNull();
        expect(queryByText(customTitleContent)).toBeNull();
    });

    it("LayoutWrapper renders custom layout, sider, header, footer, title, offLayoutArea if given props", () => {
        const customTitleContent = "customTitleContent";
        const CustomTitle = () => <p>{customTitleContent}</p>;

        const CustomLayout: React.FC<LayoutProps> = ({
            Header,
            Sider,
            Footer,
            OffLayoutArea,
            children,
        }) => (
            <div>
                {Header && <Header />}
                {Sider && <Sider />}
                {children}
                <div>custom layout</div>
                {Footer && <Footer />}
                {OffLayoutArea && <OffLayoutArea />}
            </div>
        );

        const customSiderContent = "customSiderContent";
        const CustomSider = () => <p>{customSiderContent}</p>;

        const customHeaderContent = "customHeaderContent";
        const CustomHeader = () => <p>{customHeaderContent}</p>;

        const customFooterContent = "customFooterContent";
        const CustomFooter = () => <p>{customFooterContent}</p>;

        const customOffLayoutAreaContent = "customOffLayoutAreaContent";
        const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

        const { getByText } = renderWithRefineContext(
            <LayoutWrapper
                Layout={CustomLayout}
                Title={CustomTitle}
                Sider={CustomSider}
                Header={CustomHeader}
                Footer={CustomFooter}
                OffLayoutArea={CustomOffLayoutArea}
            />,
            {
                warnWhenUnsavedChanges: false,
                mutationMode: "pessimistic",
                syncWithLocation: false,
                undoableTimeout: 5000,
                hasDashboard: false,
            },
        );

        expect(getByText(customSiderContent));
        expect(getByText(customHeaderContent));
        expect(getByText(customFooterContent));
        expect(getByText(customOffLayoutAreaContent));
        expect(getByText("custom layout"));
    });
});
