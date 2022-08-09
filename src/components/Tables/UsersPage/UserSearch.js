import { UserOutlined } from '@ant-design/icons';
import { Input, Select, Tag, Space, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOption } from '../../../state/actions-creators/usersPage';
const { Option } = Select;

function UserSearch() {
  const dispatch = useDispatch();
  const [searchOption, setSearchOption] = useState('searchName');
  const [searchString, setSearchString] = useState('');
  const isMounted = useRef(false);
  const { data } = useSelector(state => state.usersPage);

  const onOptionChange = e => {
    if (e === '1') {
      setSearchOption('searchName');
    } else {
      setSearchOption('phoneNumber');
    }
  };

  const onSearch = e => {
    setSearchString(e);
  };

  const handleEnter = e => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  useEffect(() => {
    dispatch(
      updateOption({
        searchOption: searchOption,
        searchString: searchString
      })
    );
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      message.success('검색 완료');
    }
  }, [searchOption, searchString]);

  return (
    <>
      <div className="site-input-group-wrapper">
        <Space size="middle">
          <Input.Group
            compact
            style={{
              display: 'flex'
            }}
          >
            <Select defaultValue="입금자명" onChange={onOptionChange}>
              <Option key="1" value="1">
                입금자명
              </Option>
              <Option key="2" value="2">
                전화번호
              </Option>
            </Select>

            <Input.Search
              style={{
                width: 'calc(100%)'
              }}
              placeholder="search text"
              onSearch={onSearch}
              onKeyPress={handleEnter}
            />
          </Input.Group>
          <Tag icon={<UserOutlined />} color="default">
            총 유저 수: {data ? data.total : ''}
          </Tag>
        </Space>
      </div>
    </>
  );
}

export default UserSearch;
