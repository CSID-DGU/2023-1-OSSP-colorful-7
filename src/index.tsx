import 'antd/dist/reset.css'
import { AdminQuestionnaireDetailsPage } from 'pages/Admin/QuestionnaireDetails'
import { AdminQuestionnaireListPage } from 'pages/Admin/QuestionnaireList'
import { JoinPage } from 'pages/Join'
import { LoginPage } from 'pages/Login'
import { MainPage } from 'pages/Main'
import { ProjectListPage } from 'pages/Project/List'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'styles/global.css'

// eslint-disable-next-line no-undef
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/questionnaire/list" element={<AdminQuestionnaireListPage />} />
          <Route path="/admin/questionnaire/:questionnaireId" element={<AdminQuestionnaireDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/project/list" element={<ProjectListPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
