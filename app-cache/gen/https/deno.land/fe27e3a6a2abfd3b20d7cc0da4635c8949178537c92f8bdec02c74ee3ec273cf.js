// Copyright the Browserify authors. MIT License.
// Ported mostly from https://github.com/browserify/path-browserify/
import { isWindows } from "../../_util/os.ts";
import _win32 from "./win32.ts";
import _posix from "./posix.ts";
const path = isWindows ? _win32 : _posix;
export const win32 = _win32;
export const posix = _posix;
export const { basename , delimiter , dirname , extname , format , fromFileUrl , isAbsolute , join , normalize , parse , relative , resolve , sep , toFileUrl , toNamespacedPath  } = path;
export * from "./common.ts";
export { SEP, SEP_PATTERN } from "./separator.ts";
export * from "./_interface.ts";
export * from "./glob.ts";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvcGF0aC9tb2QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IHRoZSBCcm93c2VyaWZ5IGF1dGhvcnMuIE1JVCBMaWNlbnNlLlxuLy8gUG9ydGVkIG1vc3RseSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2VyaWZ5L3BhdGgtYnJvd3NlcmlmeS9cblxuaW1wb3J0IHsgaXNXaW5kb3dzIH0gZnJvbSBcIi4uLy4uL191dGlsL29zLnRzXCI7XG5pbXBvcnQgX3dpbjMyIGZyb20gXCIuL3dpbjMyLnRzXCI7XG5pbXBvcnQgX3Bvc2l4IGZyb20gXCIuL3Bvc2l4LnRzXCI7XG5cbmNvbnN0IHBhdGggPSBpc1dpbmRvd3MgPyBfd2luMzIgOiBfcG9zaXg7XG5cbmV4cG9ydCBjb25zdCB3aW4zMiA9IF93aW4zMjtcbmV4cG9ydCBjb25zdCBwb3NpeCA9IF9wb3NpeDtcbmV4cG9ydCBjb25zdCB7XG4gIGJhc2VuYW1lLFxuICBkZWxpbWl0ZXIsXG4gIGRpcm5hbWUsXG4gIGV4dG5hbWUsXG4gIGZvcm1hdCxcbiAgZnJvbUZpbGVVcmwsXG4gIGlzQWJzb2x1dGUsXG4gIGpvaW4sXG4gIG5vcm1hbGl6ZSxcbiAgcGFyc2UsXG4gIHJlbGF0aXZlLFxuICByZXNvbHZlLFxuICBzZXAsXG4gIHRvRmlsZVVybCxcbiAgdG9OYW1lc3BhY2VkUGF0aCxcbn0gPSBwYXRoO1xuXG5leHBvcnQgKiBmcm9tIFwiLi9jb21tb24udHNcIjtcbmV4cG9ydCB7IFNFUCwgU0VQX1BBVFRFUk4gfSBmcm9tIFwiLi9zZXBhcmF0b3IudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL19pbnRlcmZhY2UudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2dsb2IudHNcIjtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpREFBaUQ7QUFDakQsb0VBQW9FO0FBRXBFLFNBQVMsU0FBUyxRQUFRLG9CQUFvQjtBQUM5QyxPQUFPLFlBQVksYUFBYTtBQUNoQyxPQUFPLFlBQVksYUFBYTtBQUVoQyxNQUFNLE9BQU8sWUFBWSxTQUFTLE1BQU07QUFFeEMsT0FBTyxNQUFNLFFBQVEsT0FBTztBQUM1QixPQUFPLE1BQU0sUUFBUSxPQUFPO0FBQzVCLE9BQU8sTUFBTSxFQUNYLFNBQVEsRUFDUixVQUFTLEVBQ1QsUUFBTyxFQUNQLFFBQU8sRUFDUCxPQUFNLEVBQ04sWUFBVyxFQUNYLFdBQVUsRUFDVixLQUFJLEVBQ0osVUFBUyxFQUNULE1BQUssRUFDTCxTQUFRLEVBQ1IsUUFBTyxFQUNQLElBQUcsRUFDSCxVQUFTLEVBQ1QsaUJBQWdCLEVBQ2pCLEdBQUcsS0FBSztBQUVULGNBQWMsY0FBYztBQUM1QixTQUFTLEdBQUcsRUFBRSxXQUFXLFFBQVEsaUJBQWlCO0FBQ2xELGNBQWMsa0JBQWtCO0FBQ2hDLGNBQWMsWUFBWSJ9