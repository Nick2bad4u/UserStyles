import unittest
from unittest.mock import patch, mock_open, MagicMock, Mock
import os
import subprocess
import logging

from generate_file_list import (
    IGNORE_LIST,
    get_git_repo_url,
    should_ignore,
    generate_file_list,
    calculate_luminance,
    is_dark_color,
    is_bright_color,
    is_readable_color,
    get_random_color,
    should_exclude_color,
    is_black_color,
    generate_file_list_with_links,
    sort_files_by_extension,
    save_file_list,
    split_into_chunks,
    write_html_header,
    write_lazyload_placeholders,
    write_lazyload_script,
)


class TestGenerateFileList(unittest.TestCase):

    def test_should_ignore(self):
        self.assertTrue(should_ignore("project/Gemfile.lock", IGNORE_LIST))

        ignore_list = [".git", "node_modules"]
        self.assertTrue(should_ignore("project/.git/", ignore_list))
        self.assertFalse(should_ignore("project/src/main.py", ignore_list))

        # Test with different ignore patterns
        ignore_list = [".git", "node_modules", ".DS_Store"]
        self.assertTrue(should_ignore("project/.DS_Store", ignore_list))
        self.assertFalse(should_ignore("project/src/main.py", ignore_list))

        # Test with nested directories
        ignore_list = [".git", "node_modules"]
        self.assertTrue(should_ignore("project/node_modules/package/", ignore_list))
        self.assertFalse(should_ignore("project/src/utils/helper.py", ignore_list))

        # Test with empty ignore list
        ignore_list = []
        self.assertFalse(should_ignore("project/.git/", ignore_list))
        self.assertFalse(should_ignore("project/src/main.py", ignore_list))

        # Test with special characters in path
        ignore_list = [".git", "node_modules"]
        self.assertTrue(should_ignore("project/.git/../.git/", ignore_list))
        self.assertFalse(should_ignore("project/src/../src/main.py", ignore_list))

    @patch("os.walk")
    def test_generate_file_list(self, mock_walk):
        mock_walk.return_value = [
            ("root", ["dir1", "dir2"], ["file1.py", "file2.js"]),
            ("root/dir1", [], ["file3.css"]),
        ]
        ignore_list = [".git", "node_modules"]
        expected_files = ["file1.py", "file2.js", "dir1/file3.css"]
        self.assertEqual(generate_file_list("root", ignore_list), expected_files)

    def test_calculate_luminance(self):
        self.assertAlmostEqual(calculate_luminance("#FFFFFF"), 255, places=2)
        self.assertAlmostEqual(calculate_luminance("#000000"), 0, places=2)
        self.assertAlmostEqual(calculate_luminance("#FF0000"), 54.213, places=2)

    def test_is_dark_color(self):
        self.assertTrue(is_dark_color("#000000"))
        self.assertFalse(is_dark_color("#FFFFFF"))

    def test_is_bright_color(self):
        self.assertTrue(is_bright_color("#FFFFFF"))
        self.assertFalse(is_bright_color("#000000"))

    def test_is_readable_color(self):
        self.assertTrue(is_readable_color("#808080"))
        self.assertFalse(is_readable_color("#000000"))

        @patch("random.randint")
        def test_get_random_color(self, mock_randint):
            mock_randint.side_effect = lambda a, b: 444444  # Always return 444444
            with patch("generate_file_list.MAX_ATTEMPTS", 100):
                with self.assertLogs("generate_file_list", level="DEBUG") as log:
                    self.assertEqual(get_random_color(), "#06c81c")
                    self.assertIn("DEBUG:generate_file_list:Generated color: #06c81c", log.output)

    @patch("generate_file_list.EXCLUDE_BRIGHT_COLORS", False)
    @patch("generate_file_list.EXCLUDE_BLACKS", True)
    @patch("generate_file_list.EXCLUDE_BLACKS_THRESHOLD", "#222222")
    @patch("generate_file_list.EXCLUDE_DARK_COLORS", False)
    def test_should_exclude_color(self):
        self.assertFalse(should_exclude_color("#FFFFFF"))
        self.assertTrue(should_exclude_color("#000000"))

    def test_is_black_color(self):
        self.assertTrue(is_black_color("#000000"))
        self.assertFalse(is_black_color("#FFFFFF"))

    @patch("generate_file_list.get_random_color")
    def test_generate_file_list_with_links(self, mock_get_random_color):
        mock_get_random_color.return_value = "#000000"
        file_list = ["file1.py", "file2.js"]
        repo_url = "https://github.com/author/repo"
        expected_html = (
            '<h2 style="color: #000000;">Repo Root</h2>\n'
            '<li><a href="https://github.com/author/repo/blob/main/file1.py" style="color: #000000;">file1.py</a></li>\n'
            '<h2 style="color: #000000;">JavaScript</h2>\n'
            '<li><a href="https://github.com/author/repo/blob/main/file2.js" style="color: #000000;">file2.js</a></li>'
        )
        self.assertEqual(generate_file_list_with_links(file_list, repo_url), expected_html)

    def test_sort_files_by_extension(self):
        files = ["file1.py", "file2.js", "file3.css"]
        expected_files = ["file3.css", "file2.js", "file1.py"]
        self.assertEqual(sort_files_by_extension(files), expected_files)

    @patch("builtins.open", new_callable=mock_open)
    def test_save_file_list(self, mock_open):
        file_list_html = "<li>file1.py</li>"
        output_file = "output.html"
        save_file_list(file_list_html, output_file)
        mock_open.assert_called_once_with(output_file, "w", encoding="utf-8")

    def test_split_into_chunks(self):
        file_list_html = "<li>file1.py</li>\n<li>file2.js</li>"
        chunk_size = 1
        expected_chunks = ["<li>file1.py</li>", "<li>file2.js</li>"]
        self.assertEqual(split_into_chunks(file_list_html, chunk_size), expected_chunks)

    @patch("builtins.open", new_callable=mock_open)
    def test_write_html_header(self, mock_open):
        f = mock_open.return_value
        write_html_header(f)
        f.write.assert_any_call("<h1>## File List</h1>\n\n")
        f.write.assert_any_call("<p># Here is a list of files included in this repository:</p>\n\n")

    @patch("builtins.open", new_callable=mock_open)
    def test_write_lazyload_placeholders(self, mock_open):
        f = mock_open()
        mock_file = Mock()
        file_list_chunks = ["<li>file1.py</li>", "<li>file2.js</li>"]
        write_lazyload_placeholders(f, file_list_chunks)
        f.write.assert_any_call(
            '<div class="lazyload-placeholder" data-content="file-list-1" style="min-height: 400px;"></div>\n'
        )
        f.write.assert_any_call(
            '<div class="lazyload-placeholder" data-content="file-list-2" style="min-height: 400px;"></div>\n'
        )


@patch("builtins.open", new_callable=mock_open)
def test_write_lazyload_script(self, mock_open):
    f = mock_open.return_value
    file_list_chunks = ["<li>file1.py</li>", "<li>file2.js</li>"]
    write_lazyload_script(f, file_list_chunks)
    f.write.assert_any_call("<script>\n")
    f.write.assert_any_call(
        "  document.querySelector(\"[data-content='file-list-1']\").innerHTML = `<li>file1.py</li>`;\n"
    )
    f.write.assert_any_call(
        "  document.querySelector(\"[data-content='file-list-2']\").innerHTML = `<li>file2.js</li>`;\n"
    )


if __name__ == "__main__":
    unittest.main()
