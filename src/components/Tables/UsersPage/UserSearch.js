import { Button, Input, Select } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;

function UserSearch() {
  const [searchOption, setSearchOption] = useState('입금자명');

  const onOptionChange = e => {
    console.log(e);
    if (e === '1') {
      setSearchOption('입금자명');
    } else {
      setSearchOption('전화번호');
    }
  };

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
          <Input
            style={{
              width: 'calc(100% - 200px)'
            }}
            placeholder={`${searchOption} 입력`}
          />
          <Button type="primary">검색</Button>
        </Input.Group>
        <br />
      </div>
    </>
  );
}

export default UserSearch;
