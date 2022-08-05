import { Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOption } from '../../../state/actions-creators/usersPage';
const { Option } = Select;

function UserSearch() {
  const dispatch = useDispatch();
  const [searchOption, setSearchOption] = useState('searchName');
  const [searchString, setSearchString] = useState('');

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
  }, [searchString]);

  return (
    <>
      <div className="site-input-group-wrapper">
        <Input.Group compact>
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
              width: 'calc(100% - 200px)'
            }}
            placeholder="search text"
            onSearch={onSearch}
            onKeyPress={handleEnter}
          />
        </Input.Group>
        <br />
      </div>
    </>
  );
}

export default UserSearch;
