import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
    FaSearch,
    FaBell,
    FaQuestionCircle,
    // FaUserCircle,
} from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";

// Styled components for the header
const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2c3e50;
    padding: 0 1rem;
    height: 50px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled(Link)`
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-right: 1rem;
`;

const NavItem = styled(Link)`
    color: white;
    font-size: 1rem;
    margin-right: 1rem;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        text-decoration: underline;
    }
`;

const PlusButton = styled.button`
    background-color: #0079bf;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 0.2rem 0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background-color: #026aa7;
    }
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    background-color: #3a4a58;
    padding: 0.3rem;
    border-radius: 3px;
`;

const SearchInput = styled.input`
    background-color: transparent;
    border: none;
    color: white;
    padding: 0.2rem;
    margin-left: 0.5rem;
    width: 150px;

    &::placeholder {
        color: #c0c0c0;
    }

    &:focus {
        outline: none;
    }
`;

const Icon = styled.div`
    color: white;
    font-size: 1.2rem;
    margin-left: 1rem;
    cursor: pointer;

    &:hover {
        color: #c0c0c0;
    }
`;

const ProfileCircle = styled.div`
    background-color: #0079bf;
    color: white;
    font-size: 1rem;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
`;

const Header: React.FC<{ title: string }> = ({ title }) => {
    return (
        <HeaderContainer>
            <LeftSection>
                <Logo to="/task">{title}</Logo>
                <NavItem to="/workspaces">Workspaces</NavItem>
                <NavItem to="/dash-board">Recent</NavItem>
                <NavItem to="/starred">Starred</NavItem>
                <NavItem to="/more">More</NavItem>
                <PlusButton>
                    <HiOutlinePlus />
                </PlusButton>
            </LeftSection>
            <RightSection>
                <SearchBar>
                    <FaSearch />
                    <SearchInput type="text" placeholder="Search" />
                </SearchBar>
                <Icon>
                    <FaBell />
                </Icon>
                <Icon>
                    <FaQuestionCircle />
                </Icon>
                <ProfileCircle>MM</ProfileCircle>
            </RightSection>
        </HeaderContainer>
    );
};

export default Header;
