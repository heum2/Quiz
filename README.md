# Quiz

## 소개

퀴즈 API를 이용해 간단한 '퀴즈' 모바일 앱을 만들었습니다.

## 미리보기

### 이미지

![home](https://raw.githubusercontent.com/heum2/image-archive/main/quiz_home.png)
![quizzes](https://raw.githubusercontent.com/heum2/image-archive/main/quiz_quizzes.png)
![results](https://raw.githubusercontent.com/heum2/image-archive/main/quiz_results.png)

### 영상

## 설치 및 실행

```bash
# node 버전
nvm use || nvm install v20.10.0

# 프로젝트 복사
git clone https://github.com/heum2/Quiz.git
cd Quiz
npm i

# 프로젝트 실행
npm run start
a or npm run android
```

## 기술 스택

- Language: TypeScript
- Library: React, React Native, React Query, React Navigation

## 기능 소개

### 주요기능

| 기능             | 내용                                                               |
| ---------------- | ------------------------------------------------------------------ |
| 소요된 시간 체크 | 퀴즈 시작 시 시간과 끝났을 때의 시간의 차이를 계산하여 보여줍니다. |
| 다시풀기         | React Query 캐시를 이용해 이전 데이터를 다시 가져와서 보여줍니다.  |
