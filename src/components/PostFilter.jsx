import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput placeholder='Поиск...'
                     value={filter.query}
                     onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <hr style={{margin: '15px 0'}}/>
            <MySelect defaultValue="Сортировка по:"
                      options={[
                          {value: 'title', name: 'По названию'},
                          {value: 'body', name: 'По описанию'}
                      ]}
                      value={filter.sort}
                      onChange={currentSelectValue => setFilter({...filter, sort: currentSelectValue})}
            />
        </div>
    );
};

export default PostFilter;