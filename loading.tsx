import { Skeleton } from "@/components/ui/skeleton"

export default function ChatLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64 bg-slate-800" />
        <Skeleton className="h-4 w-96 mt-2 bg-slate-800" />
      </div>

      <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
        {/* Чат header skeleton */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32 bg-slate-800" />
          </div>
        </div>

        {/* Основная область чата skeleton */}
        <div className="flex-1 p-4 space-y-6">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-800 animate-pulse" />
              <Skeleton className="h-6 w-64 bg-slate-800" />
              <Skeleton className="h-4 w-80 bg-slate-800" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full bg-slate-800" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Панель ввода сообщения skeleton */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-start gap-2">
            <Skeleton className="h-[52px] flex-grow bg-slate-800" />
            <Skeleton className="h-10 w-10 rounded-full bg-slate-800" />
            <Skeleton className="h-10 w-10 rounded-full bg-slate-800" />
            <Skeleton className="h-10 w-10 rounded-full bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

