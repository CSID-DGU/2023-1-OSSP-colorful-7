import Avatar from 'assets/images/missing_avatar.png'
import { FC, useEffect, useState } from 'react'
import userListSampleJson from 'constants/json/user_list_sample.json';
import { Root, StackTag, UserIcon, UserNameTypo } from './styled'
import { Button, List, Space } from 'antd'
import { UserInfoListType } from 'types/project'
import { camelizeKey } from 'utils/camelizeKey'
import { GetUserProjectManageRecommendResponseType, getUserProjectManageRecommend } from 'api/getUserProjectManageRecommend';

type SearchMemberSectionProps = {
  className?: string
  projectKey: string | 0
}

const userListData = camelizeKey(userListSampleJson.user_list) as UserInfoListType;

// 여기에 들어갈 json 데이터 정의 필요!
export const SearchMemberSection: FC<SearchMemberSectionProps> = ({ className, projectKey }) => {

  const [userInfoListData, setUserInfoListData] = useState<UserInfoListType>([])
  useEffect(() => {
    let data = {
      projectKey: 0
    }
    if(projectKey !== 0) {
      data.projectKey = parseInt(projectKey)
    } 
    getUserProjectManageRecommend(data)
    .then((response: GetUserProjectManageRecommendResponseType) => {
      if (response.status === 'SUCCESS') {
        // eslint-disable-next-line no-undef
        console.log('SUCCESS');
        // projectDetails 받아서 가공하기
      } else {
         // eslint-disable-next-line no-undef
        console.log('FAIL');
         // eslint-disable-next-line no-undef
        console.log('Error message:', response.message);
      }
    })
    .catch((error: any) => {
      // eslint-disable-next-line no-undef
      console.error('Error :', error);
    });
  }, [])


  const filteredUserListData = userListData.filter(
    (userItem) => 
      userItem.userId++ &&
      userItem.nickname.toLowerCase() &&
      userItem.developmentStackList
  )
  return (
    <Root className={className}>
      <List
        dataSource={filteredUserListData}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.userId}
            actions={[
              <Button type="primary" key={`a-${item.userId}`}>
                초대
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<UserIcon src={Avatar} alt={'프로필 이미지'} />}
              title={<UserNameTypo>{item.nickname}</UserNameTypo>}
              description={
                <Space size={[0, 'small']} wrap>
                  {item.developmentStackList
                    .map((stack) => (
                      <StackTag key={stack.stackId}>{stack.developmentStack}</StackTag>
                    ))
                  }
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Root>
  )
}
