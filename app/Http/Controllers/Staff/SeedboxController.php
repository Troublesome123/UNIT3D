<?php
/**
 * NOTICE OF LICENSE.
 *
 * UNIT3D is open-sourced software licensed under the GNU General Public License v3.0
 * The details is bundled with this project in the file LICENSE.txt.
 *
 * @project    UNIT3D
 *
 * @license    https://www.gnu.org/licenses/agpl-3.0.en.html/ GNU Affero General Public License v3.0
 * @author     HDVinnie
 */

namespace App\Http\Controllers\Staff;

use App\Models\Client;
use App\Http\Controllers\Controller;

class SeedboxController extends Controller
{
    /**
     * Display All Registered Seedboxes.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $seedboxes = Client::with('user')->latest()->paginate(50);

        return view('Staff.seedbox.index', ['seedboxes' => $seedboxes]);
    }

    /**
     * Delete A Registered Seedbox.
     *
     * @param $id
     *
     * @return Illuminate\Http\RedirectResponse
     */
    public function destroy(\Illuminate\Http\Request $request, $id)
    {
        $user = $request->user();
        $seedbox = Client::findOrFail($id);

        abort_unless($user->group->is_modo, 403);
        $seedbox->delete();

        return redirect()->route('staff.seedbox.index')
            ->withSuccess('Seedbox Record Has Successfully Been Deleted');
    }
}
